export default function Footer() {
  return (
    <footer className="bg-neutral-50 border-t py-12 sm:py-16 mt-16 sm:mt-20 w-full">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Mobile: Logo first, then stacked sections */}
        <div className="flex flex-col space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-12 lg:gap-16">
          
          {/* Logo & Info - Full width on mobile */}
          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h3 className="text-purple-600 font-bold text-2xl sm:text-xl mb-4">
              ✨ Beauty Book
            </h3>
            <p className="text-gray-600 text-base sm:text-sm leading-relaxed max-w-md mx-auto sm:mx-0">
              Discover and book the best beauty salons and professionals near you.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-gray-900 text-lg sm:text-base mb-4 sm:mb-3">
              Quick Links
            </h4>
            <ul className="space-y-3 sm:space-y-2 text-base sm:text-sm text-gray-600">
              <li>
                <a 
                  href="#" 
                  className="hover:text-purple-600 transition-colors duration-200 py-1 block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-purple-600 transition-colors duration-200 py-1 block"
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-purple-600 transition-colors duration-200 py-1 block"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-purple-600 transition-colors duration-200 py-1 block"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-gray-900 text-lg sm:text-base mb-4 sm:mb-3">
              Legal
            </h4>
            <ul className="space-y-3 sm:space-y-2 text-base sm:text-sm text-gray-600">
              <li>
                <a 
                  href="#" 
                  className="hover:text-purple-600 transition-colors duration-200 py-1 block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-purple-600 transition-colors duration-200 py-1 block"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright - More prominent spacing */}
        <div className="border-t border-gray-200 mt-12 sm:mt-16 pt-8 sm:pt-12">
          <div className="text-center text-sm sm:text-xs text-gray-500">
            © {new Date().getFullYear()} Beauty Book. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}