import { Bill } from './bill';

interface BillTableProps {
  bill: Bill;
  onBack: () => void;
}

export default function BillTable({ bill, onBack }: BillTableProps) {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Scanned Bill</h2>
      <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '4px 8px' }}>Item</th>
            <th style={{ border: '1px solid #ccc', padding: '4px 8px' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {bill.items.map((item, idx) => (
            <tr key={idx}>
              <td style={{ border: '1px solid #ccc', padding: '4px 8px' }}>{item.name}</td>
              <td style={{ border: '1px solid #ccc', padding: '4px 8px' }}>{item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '4px 8px' }}>Total</td>
            <td style={{ border: '1px solid #ccc', padding: '4px 8px' }}>{bill.total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <button style={{ marginTop: 16 }} onClick={onBack}>Scan another</button>
    </div>
  );
}
