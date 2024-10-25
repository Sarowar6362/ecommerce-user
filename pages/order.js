// import { useState, useEffect } from 'react';

// export default function OrderPage() {
//   const [formData, setFormData] = useState({
//     line_items: [],
//     name: '',
//     email: '',
//     city: '',
//     postalCode: '',
//     streetAddress: '',
//     country: '',
//     paid: false,
//   });
//   const [products, setProducts] = useState([]); // Store list of products

//   useEffect(() => {
//     // Fetch available products from the database
//     // fetch('/api/products')
//     fetch('/models/Product')
//       .then((res) => res.json())
//       .then((data) => setProducts(data.products));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleProductChange = (productId, quantity) => {
//     // Update line_items with product ID and quantity
//     setFormData((prevData) => {
//       const updatedLineItems = [...prevData.line_items];
//       const existingProductIndex = updatedLineItems.findIndex(item => item.product === productId);

//       if (existingProductIndex !== -1) {
//         updatedLineItems[existingProductIndex].quantity = quantity;
//       } else {
//         updatedLineItems.push({ product: productId, quantity });
//       }

//       return { ...prevData, line_items: updatedLineItems };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch('/api/orders', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });
//     const result = await response.json();
//     if (result.success) {
//       alert('Order submitted successfully!');
//     } else {
//       alert('Failed to submit order.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
//       <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
//       <input type="text" name="city" placeholder="City" onChange={handleInputChange} />
//       <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleInputChange} />
//       <input type="text" name="streetAddress" placeholder="Street Address" onChange={handleInputChange} />
//       <input type="text" name="country" placeholder="Country" onChange={handleInputChange} />

//       <h3>Select Products:</h3>
//       {products.map((product) => (
//         <div key={product._id}>
//           <label>
//             {product.title} ({product.category.name}): 
//             <input
//               type="number"
//               min="0"
//               placeholder="Quantity"
//               onChange={(e) => handleProductChange(product._id, parseInt(e.target.value, 10))}
//             />
//           </label>
//         </div>
//       ))}

//       <button type="submit">Submit Order</button>
//     </form>
//   );
// }







import { useState, useEffect } from 'react';

export default function OrderPage() {
  const [formData, setFormData] = useState({
    line_items: [],
    name: '',
    email: '',
    city: '',
    postalCode: '',
    streetAddress: '',
    country: '',
    paid: false,
  });
  const [products, setProducts] = useState([]); // Store list of products

  useEffect(() => {
    // Fetch available products from the database
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductChange = (productId, productTitle, quantity) => {
    // Update line_items with product ID and title
    setFormData((prevData) => {
      const updatedLineItems = [...prevData.line_items];
      const existingProductIndex = updatedLineItems.findIndex(item => item.product_id === productId);

      if (existingProductIndex !== -1) {
        updatedLineItems[existingProductIndex].quantity = quantity;
        updatedLineItems[existingProductIndex].title = title;
      } else {
        updatedLineItems.push({ product_id: productId, title, quantity }); // Include product title
      }

      return { ...prevData, line_items: updatedLineItems };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (result.success) {
      alert('Order submitted successfully!');
    } else {
      alert('Failed to submit order.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
      <input type="text" name="city" placeholder="City" onChange={handleInputChange} />
      <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleInputChange} />
      <input type="text" name="streetAddress" placeholder="Street Address" onChange={handleInputChange} />
      <input type="text" name="country" placeholder="Country" onChange={handleInputChange} />

      <h3>Select Products:</h3>
      {products.map((product) => (
        <div key={product._id}>
          <label>
            {product.title} ({product.category.name}): 
            <input
              type="number"
              min="0"
              placeholder="Quantity"
              onChange={(e) => handleProductChange(product._id, product.title, parseInt(e.target.value, 10))}
            />
          </label>
        </div>
      ))}

      <button type="submit">Submit Order</button>
    </form>
  );
}







// // pages/order.js
// import { useState, useEffect } from 'react';

// export default function OrderPage() {
//   const [products, setProducts] = useState([]);
//   const [formData, setFormData] = useState({
//     line_items: [],
//     name: '',
//     email: '',
//     city: '',
//     postalCode: '',
//     streetAddress: '',
//     country: '',
//     paid: false,
//   });

//   useEffect(() => {
//     // Fetch available products
//     const fetchProducts = async () => {
//       const response = await fetch('/api/products'); // Adjust this endpoint as needed
//       const data = await response.json();
//       setProducts(data.products);
//     };
    
//     fetchProducts();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleAddProduct = (productId) => {
//     const existingItem = formData.line_items.find(item => item.product_id === productId);
//     if (existingItem) {
//       existingItem.quantity += 1; // Increment quantity if product already exists
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         line_items: [...prev.line_items, { product_id: productId, quantity: 1 }], // Include both product_id and quantity
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch('/api/orders', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });
//     const result = await response.json();
//     if (result.success) {
//       alert('Order submitted successfully!');
//     } else {
//       alert('Failed to submit order.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Other form inputs */}
//       <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
//       <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
//       <input type="text" name="city" placeholder="City" onChange={handleInputChange} />
//       <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleInputChange} />
//       <input type="text" name="streetAddress" placeholder="Street Address" onChange={handleInputChange} />
//       <input type="text" name="country" placeholder="Country" onChange={handleInputChange} />

//       <select onChange={(e) => handleAddProduct(products[e.target.value]._id)}>
//         <option value="">Select a product</option>
//         {products.map((product, index) => (
//           <option key={product._id} value={index}>
//             {product.title}
//           </option>
//         ))}
//       </select>
//       <button type="submit">Submit Order</button>
//     </form>
//   );
// }
