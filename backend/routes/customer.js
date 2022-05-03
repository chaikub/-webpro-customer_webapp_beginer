const express = require('express')
const pool = require('../config')

router = express.Router()

router.get('/menu', async (req, res, next) => {
    const promise1 = pool.query("SELECT * FROM `menu`")
    Promise.all([promise1])
        .then((results) => {
            const [menu] = results[0];
            res.json({
                menu: menu,
                error: null,
            });
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
})

router.get('/history/:id', async (req, res, next) => {

    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        const [[orderid]] = await conn.query("SELECT * FROM `order` where customer_id = ? and check_out is null"
        ,[req.params.id])
        const [order, field2] = await conn.query("SELECT * FROM `order` join `order_item` using(order_id) join `menu` using(menu_id) where order_id = ?"
        ,[orderid.order_id])

        await conn.commit()
        res.json({
            orders: order,
        })
    }
    catch (err) {
        await conn.rollback()
        res.status(500).send(err)
    }
    finally {
        conn.release()
    }
})


router.get('/customer/:id', async (req, res, next) => {
    const promise1 = pool.query("SELECT * FROM `customer_member` where customer_id = ?", [
        req.params.id,
    ])
    const promise2 = pool.query("SELECT order_id FROM `order` where customer_id =? and check_out is null ", [req.params.id])

    Promise.all([promise1, promise2])
        .then((results) => {
            const [customer, customerFields] = results[0];
            const [order, orderIdFields] = results[1];
            res.json({
                customer: customer[0],
                order: order[0],
                error: null,
            });
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
})

router.get('/receipt/:id', async (req, res) => {
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        const [data, field1] = await conn.query(
            "SELECT * FROM `receipt` join `order` using(order_id) where customer_id = ? and check_out is null", [
            req.params.id,
        ])
        const [[receipt], field2] = await conn.query(
            "SELECT * FROM `receipt` join `order` using(order_id) where customer_id = ? and check_out is null", [
            req.params.id,
        ])
        const [order, field3] = await conn.query("SELECT * FROM `order` join `order_item` using(order_id) join `menu` using(menu_id) where order_id = ?",
        [receipt.order_id])
        await conn.commit()
        res.json({
            receipt: data,
            orders: order,
        })
    }
    catch (err) {
        await conn.rollback()
        res.status(500).send(err)
    }
    finally {
        conn.release()
    }
})

router.put('/:no/payment/:id', async (req, res,) => {
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        let results = await conn.query(
            "UPDATE `order` SET check_out = CURRENT_TIMESTAMP WHERE customer_id = ? and check_out is null",
            [req.params.id]);
            await conn.query(
                "UPDATE `table` SET status = 'ready' where table_id = ?",
            [req.params.no]);
        res.json(results)
        await conn.commit()
        res.status(200).send()
    }
    catch (err) {
        await conn.rollback()
        res.status(500).send(err)
    }
    finally {
        conn.release()
    }
})

router.put('/order/:id', async (req, res,) => {
    const price = req.body.priceTotal
    const quantity = req.body.itemsTotal
    const items = req.body.items
    if (items[0].member_price) {
        for (let i = 0; i < items.length; i++) {
            items[i].price = items[i].member_price
        }
    } else {
        for (let i = 0; i < items.length; i++) {
            items[i].price = items[i].menu_price
        }
    }
    // res.json(items)
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        let results = await conn.query(
            "UPDATE `order` SET total_price = ?, quantity_item = ?, status = 'ordered' WHERE order_id = ? and check_out is null",
            [price, quantity, req.params.id])
        for (let i = 0; i < items.length; i++) {
            await conn.query(
                "INSERT INTO `order_item`(total_price, amount, price, order_id, menu_id) VALUES (?,?,?,?,?);",
                [items[i].price * items[i].quantity, items[i].quantity, items[i].price, req.params.id, items[i].menu_id])
        };
        res.json(items)
        await conn.commit()
        res.status(200).send()
    }
    catch (err) {
        await conn.rollback()
        res.status(500).send(err)
    }
    finally {
        conn.release()
    }
})

router.post('/:tableId/guest', async (req, res, next) => {
    // create new order and serviced_customer
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        const [row1, field] = await pool.query(
            "INSERT INTO customer (type) VALUES ('normal')"
        )
        const [row2, field2] = await conn.query(
            "INSERT INTO `order` (create_date, total_price, quantity_item, status, check_in, customer_id, employee_id) VALUES (CURRENT_TIMESTAMP, 0.00, 0, 'pending', CURRENT_TIMESTAMP, ?, 3)",
            [row1.insertId]
        )
        const [row3, field3] = await conn.query(
            `UPDATE \`table\` SET \`status\` = 'not_ready' WHERE table_id = ?`,
            [req.params.tableId]
        )
        await conn.commit()
        res.json(row1.insertId)
        res.status(200).send()
    }
    catch (err) {
        await conn.rollback()
        res.status(500).send(err)
    }
    finally {
        conn.release()
    }
})

router.post('/:tableId/member', async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        const [users] = await conn.query(
            'SELECT * FROM customer_member WHERE phone_number=?',
            [username]
        )
        const user = users[0]

        if (!user) {
            throw new Error('Incorrect username or password')
        }
        let bool = password.localeCompare(user.password)
        if (bool) {
            throw new Error('Incorrect username or password')
        }
        if (user) {
            const [row1, field1] = await conn.query(
                "INSERT INTO `order` (create_date, total_price, quantity_item, status, check_in, customer_id, employee_id) VALUES (CURRENT_TIMESTAMP, 0.00, 0, 'pending', CURRENT_TIMESTAMP, ?, 3)",
                [user.customer_id]
            )
            const [row2, field3] = await conn.query(
                `UPDATE \`table\` SET \`status\` = 'not_ready' WHERE table_id = ?`,
                [req.params.tableId]
            )
            res.json(user)
            await conn.commit()
            res.status(200).send()
        }
    }
    catch (err) {
        await conn.rollback()
        res.status(500).send(err)
    }
    finally {
        conn.release()
    }
})

router.post('/checkbill/:id', async (req, res) => {
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        const [[order]] = await conn.query(
            `SELECT * FROM \`order\`
        WHERE customer_id = ? AND \`check_out\` is null`,
            [req.params.id]
        )

        const [receipt, field2] = await conn.query(
            `SELECT receipt_no
        FROM receipt`
        )

        var generator = () => {
            var str = ''
            for (var i = 0; i < 10; i++) {
                str += Math.floor(Math.random() * 10)
            }
            return str
        }

        var receiptNo = generator()
        while (receipt.includes(receiptNo)) {
            receiptNo = random()
        }
        const [row2, field3] = await conn.query(
            `INSERT INTO receipt (total_price, date_create, receipt_no, order_id)
        VALUES (?, CURRENT_TIMESTAMP, ?, ?)`,
            [order.total_price, receiptNo, order.order_id]
        )
        await conn.commit()
        res.status(200).send()
    }
    catch (err) {
        await conn.rollback()
        res.status(500).send(err)
    }
    finally {
        conn.release()
    }
})

exports.router = router;