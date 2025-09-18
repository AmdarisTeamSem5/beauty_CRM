export function Footer() {
    return (
      <footer className="bg-neutral-50 border-t py-10 mt-16 -mx-42 w-screen">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Logo & Info */}
          <div>
            <h3 className="text-purple-600 font-bold text-lg">✨ Beauty Book</h3>
            <p className="text-gray-600 text-sm mt-2">
              Discover and book the best beauty salons and professionals near you.
            </p>
          </div>
  
          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-800">Quick Links</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
  
          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-800">Legal</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
  
        {/* Bottom */}
        <div className="text-center text-xs text-gray-500 mt-10">
          © {new Date().getFullYear()} Beauty Book. All rights reserved.
        </div>
      </footer>
    );
  }
  