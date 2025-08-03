import { useState } from 'react';
import Camera from './Camera';
import BillTable from './BillTable';
import { Bill } from './bill';
import './App.css';

export default function App() {
  const [bill, setBill] = useState<Bill | null>(null);

  return (
    <div className="App">
      {bill ? (
        <BillTable bill={bill} onBack={() => setBill(null)} />
      ) : (
        <Camera onScanComplete={setBill} />
      )}
    </div>
  );
}
