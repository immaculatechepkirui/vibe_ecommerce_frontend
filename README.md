# How The App Works

- The `api.js` utility handles API requests to the backend on `localhost:4000` (set in .env).
- The `useCart.js` hook in `/hooks` manages the cart, with persistence in localStorage.
- The main screens/components in `/components` are:
  - Header.js: AppBar with logo and cart badge
  - ProductGrid.js: Displays products and "Add" buttons
  - CartModal.js: Shopping cart modal with checkout form
  - ConfirmOrderModal.js: Modal shown after placing an order
- Main React app is in App.js.

# Adding Images:

Images for each product must be available via a URL in your products table or mocked backend response with an `image` property.
