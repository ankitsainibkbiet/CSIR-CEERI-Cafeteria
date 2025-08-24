import { Link } from "react-router-dom";
import Container from "./Container";

function Footer() {
    return (
        <Container>
            <footer className="w-full bg-[#333] text-white font-serif text-center px-4 py-8 box-border">
                <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row flex-wrap justify-between text-left sm:text-center gap-y-6">
                    {/* About Us */}
                    <div className="w-full sm:w-[48%] lg:w-[23%] px-2">
                        <h2 className="border-b-2 border-[#febd68] pb-2 mb-2 text-lg font-semibold">About Us</h2>
                        <p>
                            We are dedicated to providing the best index experience at CSIR-CEERI. Enjoy our wide range of food and beverages.
                        </p>
                    </div>

                    {/* Contact Us */}
                    <div className="w-full sm:w-[48%] lg:w-[23%] px-2">
                        <h2 className="border-b-2 border-[#febd68] pb-2 mb-2 text-lg font-semibold">Contact Us</h2>
                        <p>Email: <Link to="/contact" className="text-[#febd68] hover:underline">support@csirceeri.com</Link></p>
                        <p>Phone: +123-456-7890</p>
                        <p>Address: CSIR-CEERI Campus, Pilani, Rajasthan, India</p>
                    </div>

                    {/* Follow Us */}
                    <div className="w-full sm:w-[48%] lg:w-[23%] px-2">
                        <h2 className="border-b-2 border-[#febd68] pb-2 mb-2 text-lg font-semibold">Follow Us</h2>
                        <div className="flex gap-4 justify-start sm:justify-center text-[#febd68] text-xl">
                            <Link to="/facebook" className="hover:text-white">
                                <i className="fab fa-facebook-f"></i>
                            </Link>
                            <Link to="/twitter" className="hover:text-white">
                                <i className="fab fa-twitter"></i>
                            </Link>
                            <Link to="/instagram" className="hover:text-white">
                                <i className="fab fa-instagram"></i>
                            </Link>
                            <Link to="/linkedin" className="hover:text-white">
                                <i className="fab fa-linkedin-in"></i>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="w-full sm:w-[48%] lg:w-[23%] px-2">
                        <h2 className="border-b-2 border-[#febd68] pb-2 mb-2 text-lg font-semibold">Quick Links</h2>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-[#febd68] hover:underline">Home</Link></li>
                            <li><Link to="/order-history" className="text-[#febd68] hover:underline">Order History</Link></li>
                            <li><Link to="/cart" className="text-[#febd68] hover:underline">Cart</Link></li>
                            <li><Link to="/contact" className="text-[#febd68] hover:underline">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="bg-[#222] mt-8 py-3 text-sm text-center">
                    <p className="mb-1">&copy; 2025 CSIR-CEERI index. All Rights Reserved.</p>
                    <p>MADE WITH <i className="fa-regular fa-heart text-[#febd68]"></i> FROM BKBIET</p>
                </div>
            </footer>
        </Container>
    );
}

export default Footer;
