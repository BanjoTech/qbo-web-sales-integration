const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// QuickBooks Online REST API Endpoint Construction
app.post('/api/sync-invoice', async (req, res) => {
    const { customerId, itemName, qty, unitPrice } = req.body;

    // Build Intuit QBO JSON Payload
    const qboPayload = {
        "Line": [{
            "Amount": qty * unitPrice,
            "DetailType": "SalesItemLineDetail",
            "SalesItemLineDetail": {
                "ItemRef": { "name": itemName, "value": "8" },
                "Qty": Number(qty),
                "UnitPrice": Number(unitPrice)
            }
        }],
        "CustomerRef": { "name": customerId, "value": "42" },
        "TxnDate": new Date().toISOString().split('T')[0]
    };

    try {
        // Execute POST Request to QuickBooks Sandbox Endpoint
        const response = await axios.post(
            `https://sandbox-quickbooks.api.intuit.com/v3/company/${process.env.QBO_REALM_ID}/invoice`,
            qboPayload,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.QBO_ACCESS_TOKEN}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        res.status(200).json({ status: "Success", invoiceId: response.data.Invoice.Id });
    } catch (error) {
        res.status(500).json({ status: "Failed", error: error.message });
    }
});

app.listen(3000, () => console.log('QBO Integration Server running on port 3000'));
