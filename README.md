# QuickBooks Online Web Transaction Integration (QBO API)

An automated financial data pipeline that syncs point-of-sale and custom web order transactions directly into QuickBooks Online using REST API endpoints (OAuth 2.0).

## System Architecture & Workflow
1. **Frontend Capture (`index.html`):** Field sales form collects transaction metrics (Customer ID, Line Items, Quantity, Unit Price, and Delivery Waybills).
2. **Payload Formatting (`server.js`):** Converts raw form requests into structured JSON matching Intuit QuickBooks Online REST API schema.
3. **API Posting (`POST /v3/company/{realmId}/invoice`):** Dispatches authenticated payload via HTTP headers using OAuth 2.0 Access Tokens.
4. **General Ledger Automation:** Automatically updates Accounts Receivable (Debtors Ledger) and Sales Revenue accounts while maintaining audit trails.

## Tech Stack
* **Accounting Engine:** QuickBooks Online REST API, Intuit Developer Sandbox
* **Backend:** Node.js, Express.js, Axios
* **Frontend:** HTML5, CSS3, JavaScript (Fetch API)
* **Security & Auth:** OAuth 2.0, Environment Variable Management (.env)
