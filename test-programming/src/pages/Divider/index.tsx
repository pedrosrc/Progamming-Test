import { useState } from "react"
import styles from './divider.module.css'
import BackButton from "../../components/BackButton";

interface Product {
  name: string;
  price: number;
}

interface Customer {
  name: string;
  products: Product[];
}

export default function Divider() {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [tip, setTip] = useState<boolean[]>([]);
  const productCountMap: { [key: string]: number } = {};

  const addCustomer = () => {
    setCustomers([...customers, { name: '', products: [] }]);
    setTip([...tip, false]);
  };

  const addProduct = () => {
    setProducts([...products, { name: '', price: 0 }]);
  };

  const handleCustomerNameChange = (index: number, name: string) => {
    const updatedCustomers = [...customers];
    updatedCustomers[index].name = name;
    setCustomers(updatedCustomers);
  };

  const handleProductNameChange = (index: number, name: string) => {
    const updatedProducts = [...products];
    updatedProducts[index].name = name;
    setProducts(updatedProducts);
  };

  const handleProductPriceChange = (index: number, price: string) => {
    const updatedProducts = [...products];
    updatedProducts[index].price = parseFloat(price);
    setProducts(updatedProducts);
  };


  const handleProductConsumed = (customerIndex: number, productIndex: number) => {
    const updatedCustomers = [...customers];
    const customer = updatedCustomers[customerIndex];
    const product = products[productIndex];
  
    const productIndexInCustomer = customer.products.findIndex(
      prod => prod.name === product.name
    );
  
    if (productIndexInCustomer !== -1) {
      customer.products.splice(productIndexInCustomer, 1);
    } else {
      customer.products.push(product);
    }
    setCustomers(updatedCustomers);
  };

  const handleTipChange = (index: number) => {
    const updatedTip = [...tip];
    updatedTip[index] = !updatedTip[index];
    setTip(updatedTip);
  };

  const removeCustomer = (index: number) => {
    const updatedCustomers = [...customers];
    updatedCustomers.splice(index, 1);
    setCustomers(updatedCustomers);
    const updatedTip = [...tip];
    updatedTip.splice(index, 1);
    setTip(updatedTip);
  };


  const removeProduct = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);

    const updatedCustomers = customers.map(customer => {
      const updatedProducts = customer.products.filter(
        (_, productIndex) => productIndex !== index
      );
      return { ...customer, products: updatedProducts };
    });
    setCustomers(updatedCustomers);
  };


  const calculateTotal = () => {
    let total = 0;
    customers.forEach(customer => {
      customer.products.forEach(product => {
        productCountMap[product.name] = (productCountMap[product.name] || 0) + 1;
      });
    });
    customers.forEach(customer => {
      let subtotal = 0;

      customer.products.forEach(product => {
        const productCount = productCountMap[product.name] || 1;
        subtotal += product.price / productCount;
      });

      if (tip[customers.indexOf(customer)]) {
        subtotal += subtotal * 0.1;
      }

      total += subtotal;
    });
    return (total)
  };

  const calculateShare = (customer: Customer, index: number) => {
    let share = 0;
  
    const productCountMap: { [key: string]: number } = {}; 
    customers.forEach(c => {
      c.products.forEach(product => {
        productCountMap[product.name] = (productCountMap[product.name] || 0) + 1;
      });
    });
    const uniqueProducts = customer.products.filter(
      (product, productIndex, self) =>
        self.findIndex(p => p.name === product.name) === productIndex
    );
    uniqueProducts.forEach(product => {
      const productCount = productCountMap[product.name] || 1; 
      const totalPrice = product.price; 
      share += totalPrice / productCount; 
    });
    if (tip[index]) {
      share += share * 0.1;
    }
    return share;
  };

  return (
    <div className={styles.container_divider}>
      <h1>Divisor de Contas de Restaurante</h1>
      <div className={styles.section_custumer}>
        <h2>Clientes</h2>
        {customers.map((customer, index) => (
          <div key={index} className={styles.products}>
            <input
              type="text"
              value={customer.name}
              onChange={e => handleCustomerNameChange(index, e.target.value)}
              placeholder="Nome do cliente"
            />
            <ul>
              {products.map((product, productIndex) => (
                <li key={productIndex}>
                  <input
                    type="checkbox"
                    onChange={() => handleProductConsumed(index, productIndex)}
                  />
                  {product.name} (R${product.price.toFixed(2)})
                </li>
              ))}

            </ul>
            <label>
              <input
                type="checkbox"
                checked={tip[index]}
                onChange={() => handleTipChange(index)}
              />
              Pagar 10% opcional
            </label>
            <button onClick={() => removeCustomer(index)} className={styles.button_remove}>Remover Cliente</button>

          </div>

        ))}
        <button onClick={addCustomer} className={styles.button_add}>Adicionar Cliente</button>
      </div>

      <div className={styles.section_product}>
        <h2>Produtos</h2>
        {products.map((product, index) => (
          <div key={index} className={styles.products}>
            <input
              type="text"
              value={product.name}
              onChange={e => handleProductNameChange(index, e.target.value)}
              placeholder="Nome do produto"
            />
            <input
              type="number"
              value={product.price}
              step="0.01"
              onChange={e => handleProductPriceChange(index, e.target.value)}
              placeholder="Valor do Produto"
            />
            <button onClick={() => removeProduct(index)} className={styles.button_remove}>Remover Produto</button>
          </div>
        ))}
        <button onClick={addProduct} className={styles.button_add}>Adicionar Produto</button>
      </div>
      <div className={styles.result}>
        <div className={styles.result}>
          <h2>Resultado</h2>
          {customers.map((customer, index) => (
            <p key={index}>
              {customer.name}: R$ {calculateShare(customer, index).toFixed(2)}
            </p>
          ))}
          <p>Total: R$ {calculateTotal().toFixed(2)}</p>
        </div>
        <div className={styles.btn_back}>
          <BackButton />
        </div>
      </div>


    </div>

  );
}
