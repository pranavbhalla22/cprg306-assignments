import Link from "next/link";

export default function page(){
  return(
    <div>
      <h1 className="text-2xl font-bold mb-4">CPRG 306: Web Development 2 - Assignments</h1>
      <p>
        Link to week 2: <Link href="week-2" className="text-blue-500 hover:text-blue-700">Week 2</Link>
      </p>
      <p>
        Link to week 3: <Link href="week-3" className="text-green-500 hover:text-green-700">Week 3</Link>
      </p>
      <p>
        Link to week 4: <Link href="week-4" className="text-red-500 hover:text-red-700">Week 4</Link>
      </p>
      <p>
        Link to week 5: <Link href="week-5" className="text-purple-500 hover:text-purple-700">Week 5</Link>
      </p>
    </div>
  );
}
