import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const {
      customer_name,
      phone,
      employee_name,
      invoice_number,
      categories,
      satisfaction,
    } = req.body;

    // Validate required fields
    if (!customer_name || !phone || !employee_name || !invoice_number || !categories || !satisfaction) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Google Sheets authentication
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const sheetId = process.env.GOOGLE_SHEET_ID;

    // Prepare row data
    const timestamp = new Date().toISOString();
    const categoriesString = Array.isArray(categories) ? categories.join(', ') : categories;

    const row = [
      timestamp,
      customer_name,
      phone,
      categoriesString,
      satisfaction,
      employee_name,
      invoice_number,
    ];

    // Append row to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error adding customer:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
