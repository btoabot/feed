// For this project, we’ll use a redirect.
// In a real application, we would use a login page here or home

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/feed');
}
