class ProductCategoryRow extends React.Component {
    render() {
      return (
        <tr>
          <th colSpan="2">
            {this.props.category}
          </th>
        </tr>
      );
    }
  }  
  
  class ProductRow extends React.Component {
    render() {
      const product = this.props.product;
      const name = product.stocked ?
        product.name :
        <span style={{color: 'red'}}>
          {product.name}
        </span>;
  
      return (
        <tr>
          <td>{name}</td>
          <td>{product.price}</td>
        </tr>
      );
    }
  }  
  
  class ProductTable extends React.Component {
    
    render() {
      const rows = []
      let lastCat = null
      const {isStockOnly, txtSearch} = this.props
      this.props.products.forEach(product => {
        if(product.name.indexOf(txtSearch) === -1) return
        if(isStockOnly && !product.stocked) return
        if(product.category !== lastCat) rows.push(
          <ProductCategoryRow 
            category={product.category} 
            key={product.category}
          />)
        rows.push(
          <ProductRow 
            key={product.name} 
            product={product}
          />)
        lastCat = product.category
      })
      
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>);
    }
  }  
  
  class SearchBar extends React.Component {
    
    onCheckBox = (e) => {
      this.props.onCheckBox(e.target.checked)
    }
    
    onInput = (e) => {
      this.props.onSearch(e.target.value)
    }
    
    render() {
      return (
        <div>
          <input onChange={this.onInput} placeholder="Search..." value={this.props.txtSearch}/>
          <p>
            <input type="checkbox" onChange={this.onCheckBox} checked={this.props.isStockOnly}/>
            {' '}
            Show products in stock only
          </p>
        </div>
      )
    }
  } 
  
  class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        isStockOnly: false,
        txtSearch: ''
      }
    }
    
    onCheckBox = (inStock) => {
      this.setState({isStockOnly: inStock})
    }
    
    onSearch = (searchStr) => {
       this.setState({txtSearch: searchStr})
    }
    
    render() {
      return (
        <div>
          <SearchBar 
            isStockOnly={this.state.isStockOnly}
            onCheckBox={this.onCheckBox} 
            onSearch={this.onSearch}
            txtSearch={this.state.txtSearch}
          />
          <ProductTable
            products={this.props.products}
            isStockOnly= {this.state.isStockOnly}
            txtSearch={this.state.txtSearch}
           />
        </div>
      )
    }
  }
  
  const data = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];
  
  ReactDOM.render(
    <App products={data}/>,
    document.getElementById('root')
  );
  