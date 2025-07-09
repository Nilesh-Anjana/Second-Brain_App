// app.tsx
import { useState } from 'react';
import { Button } from './components/Button';
import { PlusIcon } from './icons/PlusIcon';

function App() {
  return ( 
    <>
      <Button startIcon={<PlusIcon />} size="sm" variant="primary" text="Share" onClick={() => {}} />
      <Button size="md" variant="secondary" text="Add Content" onClick={() => {}} />
      <Button size="lg" variant="secondary" text="Add Content" onClick={() => {}} />
    </>
  );
}

export default App;
