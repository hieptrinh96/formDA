import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <h1 className="text-4x1 font-bold text-blue-600">Hello, Welcome to the home page</h1>
      <ul>
        <li><Link href='/form/formDA'>DA Form</Link></li>
      </ul>
    </div>
    
  );
}
