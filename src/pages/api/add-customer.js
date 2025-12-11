import { google } from 'googleapis';

export const prerender = false;

export async function POST({ request }) {
  try {
    const body = await request.json();
    const {
      customer_name,
      phone,
      employee_name,
      invoice_number,
      categories,
      satisfaction,
      notes,
    } = body;

    // Validate required fields (notes is optional)
    if (!customer_name || !phone || !employee_name || !invoice_number || !categories || !satisfaction) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Google Sheets authentication using JWT
    const privateKey = import.meta.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const clientEmail = import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const sheetId = import.meta.env.GOOGLE_SHEET_ID;

    const auth = new google.auth.JWT(
      clientEmail,
      null,
      privateKey,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });

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
      notes || '',
    ];

    // Append row to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:H',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error adding customer:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
