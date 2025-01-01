import Link from "next/link";

const Navbar = () => {
    return (  <>
        <div className="w-full h-20 bg-gray-900 sticky top-0">
          <div className="container mx-auto px-4 h-full">
          
            <div className="pl-24 pr-24 flex justify-between items-center h-full text-white">
            Best Hyderabad
              <ul className="hidden md:flex gap-x-6 ">
                <li>
                  <Link href="/about">
                    <p>About Us</p>
                  </Link>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </> );
}
 
export default Navbar;