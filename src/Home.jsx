import React from 'react';
// import ReactDom from 'react-dom';

class GroupTitle extends React.Component {
    render() {
        return(
            <h5 className="products-title">{this.props.title}</h5>
        )
    }
}
class Item extends React.Component {
    render() {
        const product = this.props.product;
        const itemClasses = !product.stocked ? 'products-list__item out-of-stock' : 'products-list__item';
        return (
            <li className={itemClasses}>
                <span className="products-list__name">{product.name}</span>
                <span className="products-list__price">{product.price}</span>
            </li>
        )
    }
}
class GroupItem extends React.Component {
    render() {
        return (
            <ul className="products-list">{this.props.value}</ul>
        );
    }
}

class ProductList extends React.Component {
    
    render() {
        const products = this.props.products;
        const items = [];
        let cates = [];
        const {isStockOnly} = this.props;

        products.map(product => cates.push(product.category));
        const uniqueCate = cates.filter((item,index) => {
            // console.log(item, " __ ", index, " __ ", cates.indexOf(item), " __ ", cates.indexOf(item) === index)
            return cates.indexOf(item) === index;
        });

        uniqueCate.map(cateItem => {
            items.push(<GroupTitle key={cateItem} title={cateItem}/>);
            let groupItem = [];
            products.forEach(product => {
                if (isStockOnly && !product.stocked) return
                if (product.category === cateItem) {
                    groupItem.push(
                        <Item key={product.id} product={product} />
                        );
                }
            });
            items.push(<GroupItem key={cateItem.concat("-list")} value={groupItem}/>);
            return items;
        })


        return (
            <div className="product-section__list">
                <ul className="products-list products-list--header">
                    <li className="products-list__item">
                        <span className="products-list__name">Name</span>
                        <span className="products-list__price">Price</span>
                    </li>
                </ul>
                {items}
            </div>
        );
    }
}

class SearchBar extends React.Component {
    
    onCheckbox = (e) => {
        this.props.onCheckBox(e.target.checked)
    }

    render() {
        return (
            <div className="product-section__search">
                <div>
                    <input type="text" placeholder="Search..." 
                    className="ipt-search expand" 
                    />
                </div>
                <label className="chk-stock">
                    <input type="checkbox"
                    onChange={this.onCheckbox}
                    checked={this.props.isStockOnly}
                    />
                    <span>Only show products in stock</span>
                </label>
            </div>
        );
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isStockOnly: false,
            txtSearch: ""
        };
    }
    onCheckbox = (inStock) => {
        this.setState({isStockOnly: inStock});
    }

    render() {
        return (
            <section className="product-section">
                <SearchBar 
                    isStockOnly={this.state.isStockOnly}
                    onCheckbox={this.onCheckbox} 
                />
                <ProductList 
                    products={this.props.products} 
                    isStockOnly={this.state.isStockOnly}
                />
            </section>
        );
    }
}


export default Home;