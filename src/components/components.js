import React from "react";
import { v4 } from "uuid";

export class Page extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            cart: [],
            prodDetails: {
                "id": String(v4()),
                "company": "SNEAKERS COMPANY",
                "shoeName": "Fall Limited Edition Sneakers",
                "shoeDescription": "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
                "originalPrice": 250.00,
                "discountedPrice": 125.00,
                "discountPercentage": "50%",
            }
        }

        this.addToCart = this.addToCart.bind(this)
        this.removeFromCart = this.removeFromCart.bind(this)
    }

    addToCart(basketItem) {
        let copyItems = [].concat(this.state.cart)
        copyItems[0] = basketItem
        this.setState((state = this.state) => {
            return {
                cart: copyItems,
            }
        })

        return
    }

    removeFromCart() {
        this.setState((state) => {
            return {
                cart: [],
            }
        })

        return
    }


    render() {
        return (
            <section>
                <noscript>You need to enable JavaScript to run this page.</noscript>
                <header>
                    <Header cart={this.state.cart} />
                </header>
                <main>
                    <Product prodDetails={this.state.prodDetails} addToCart={this.addToCart} removeFromCart={this.removeFromCart} nextBasketItemRemovalIndex={this.state.cart.length} />
                </main>
            </section>
        )
    }
}

export class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            displayCart: false,
            displayMobileNav: false
        }

        this.selectedNavLinkRef = React.createRef()
        this.mobileNavRef = React.createRef()
        this.changeChosenNavLink = this.changeChosenNavLink.bind(this)
        this.toggleCartDisplay = this.toggleCartDisplay.bind(this)
        this.toggleMobileNavDisplay = this.toggleMobileNavDisplay.bind(this)
    }


    changeChosenNavLink(event) {
        this.selectedNavLinkRef.current.classList = String(this.selectedNavLinkRef.current.getAttribute("class")).replace("chosen", "")
        event.target.classList = String(event.target.classList) + " chosen"
        this.selectedNavLinkRef.current = event.target

        return
    }

    toggleMobileNavDisplay() {
        this.mobileNavRef.current.style.right = (this.mobileNavRef.current.style.right === "0px") ? "100%": "0px"

        return
    }

    toggleCartDisplay() {
        this.setState((state) => {
            return {
                displayCart: (this.state.displayCart === true) ? false: true,
            }
        })

        return
    }

    render() {
        return (
            <section className="top_menu">
                <article className="header_container">
                    <section className="header_top_left_container">

                        { /* Mobile Only  */ }

                        <section className="nav_menu_container mobile">
                            <img src="./images/icon-menu.svg" className="nav_menu_icon" alt="Open Menu" onClick={this.toggleMobileNavDisplay} />
                        </section>

                        <section className="logo_container">
                            <img src="./images/logo.svg" className="header_logo" alt="SNEAKERS" />
                        </section>

                        { /* Desktop Only  */ }

                        <nav className="nav_menu_desktop nav_menu desktop">
                            <a href="#" className="nav_link desktop_nav_link chosen" onClick={this.changeChosenNavLink} ref={this.selectedNavLinkRef}>Collections</a>
                            <a href="#" className="nav_link desktop_nav_link" onClick={this.changeChosenNavLink}>Men</a>
                            <a href="#" className="nav_link desktop_nav_link" onClick={this.changeChosenNavLink}>Women</a>
                            <a href="#" className="nav_link desktop_nav_link" onClick={this.changeChosenNavLink}>About</a>
                            <a href="#" className="nav_link desktop_nav_link" onClick={this.changeChosenNavLink}>Contact</a>
                        </nav>
                    </section>
                    <section className="header_top_right_container">
                        <section className="cart_icon_container">
                            <img src="./images/icon-cart.svg" className="cart_icon" alt="Cart" onClick={this.toggleCartDisplay} />
                            <span>{this.props.cart.length}</span>
                        </section>
                        <section className="profile_img_container">
                            <img src="./images/image-avatar.png" className="profile_img" alt="Profile" />
                        </section>
                    </section>
                </article>
                { this.state.displayCart === true ? <Cart cart={this.props.cart} removeFromCart={this.props.removeFromCart} />: ""}
                <MobileNav childRef={this.mobileNavRef} toggleMobileNavDisplayFunction={this.toggleMobileNavDisplay}/>
            </section>
        )
    }
}

export class Cart extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        
        // Setup each product added to cart through list.
        let cart_elements = [];
        let product_in_cart_elements = [];

        // Add product elements if cart is not empty. Otherwise, state that cart is empty.
        if (this.props.cart.length !== 0) {
            product_in_cart_elements = this.props.cart
        }
        else {
            product_in_cart_elements.push(
                <section className="cart_product empty_cart_container">
                    Your cart is empty.
                </section>
            )
        }

        // Add structure elements to cart.
        cart_elements.push(
            <article className="cart_container">
                <h3 className="cart_title">Cart</h3>
                <hr className="cart_line_divider" />
                {product_in_cart_elements}
                { (this.props.cart.length !== 0) ? <button className="orange_button checkout_button">Checkout</button>: ""}
            </article>
        )

        return (
            <section className="cart">
                {cart_elements}
            </section>
        )
    }
}

class MobileNav extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <nav className="nav_menu_mobile nav_menu mobile" ref={this.props.childRef} onClick={this.props.toggleMobileNavDisplayFunction}>
                <article className="nav_menu_mobile_container">
                    <section className="close_nav_container">
                        <img src="./images/icon-close.svg" className="close_nav_icon" alt="Close Navigation" />
                    </section>
                    <section className="mobile_nav_links">
                        <a href="#" className="nav_link mobile_nav_link">Collections</a>
                        <a href="#" className="nav_link mobile_nav_link">Men</a>
                        <a href="#" className="nav_link mobile_nav_link">Women</a>
                        <a href="#" className="nav_link mobile_nav_link">About</a>
                        <a href="#" className="nav_link mobile_nav_link">Contact</a>
                    </section>
                </article>
            </nav>
        )
    }
}

export class Product extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            displayModal: false,
        }

        this.largeImageRef = React.createRef()
        this.chosenThumbnailImageRef = React.createRef()

        this.processNewLargeImage = this.processNewLargeImage.bind(this)
        this.toggleModalDisplay = this.toggleModalDisplay.bind(this)
    }

    toggleModalDisplay() {
        this.setState((state) => {
            return {
                displayModal: (this.state.displayModal === true) ? false: true
            }
        })

        return
    }

    calculateImageNumber(newImageNumber) {
        if (newImageNumber < 1) {
            newImageNumber = 4
        }
        else if (newImageNumber > 4) {
            newImageNumber = 1
        }
        return newImageNumber
    }

    processNewLargeImage(event, largeImageRef, thubnailImageRef, moveBy=0) {

        // Create the replacement value String and the new value for the image number.
        let replace_value = "image-product-" + String(largeImageRef.current.getAttribute("image_number"))
        let new_value;

        if (moveBy !== 0) {
            new_value = String(this.calculateImageNumber(Number(largeImageRef.current.getAttribute("image_number")) + moveBy))
        }
        else {
            new_value = String(event.target.getAttribute("image_number"))
        }

        // Changes the large image displayed.
        largeImageRef.current.src = String(largeImageRef.current.src).replace(replace_value, "image-product-" + new_value)
        if (moveBy !== 0) {
            largeImageRef.current.setAttribute("image_number", new_value)
        }
        else {
            largeImageRef.current.setAttribute("image_number", String(event.target.getAttribute("image_number")))

            // Changes the chosen thumbnail image.
            thubnailImageRef.current.classList = String(thubnailImageRef.current.classList).replace(" chosen", "")
            thubnailImageRef.current = event.target
            thubnailImageRef.current.classList = String(thubnailImageRef.current.classList) + " chosen"
        }

        return
    }

    render() {
        return (
            <section className="main_container">
                <article className="product_container">
                    <section className="image_selection_container">
                        <section className="large_product_image_container">
                            <span className="image_selector back mobile no_select" onClick={(event) => {this.processNewLargeImage(event, this.largeImageRef, this.chosenThumbnailImageRef, -1)}}>{"<"}</span>
                            <img src="./images/image-product-1.jpg" className="large_product_image" alt="Product Img 1" image_number="1" onClick={this.toggleModalDisplay} ref={this.largeImageRef} />
                            <span className="image_selector forward mobile no_select" onClick={(event) => {this.processNewLargeImage(event, this.largeImageRef, this.chosenThumbnailImageRef, 1)}}>{">"}</span>
                        </section>
                        <section className="image_thumbnails_list_container desktop">
                            <img src="./images/image-product-1-thumbnail.jpg" className="image_thumbnail" alt="Product Img 1 Thumbnail" image_number="1" onClick={(event) => {this.processNewLargeImage(event, this.largeImageRef, this.chosenThumbnailImageRef)}} ref={this.chosenThumbnailImageRef} />
                            <img src="./images/image-product-2-thumbnail.jpg" className="image_thumbnail" alt="Product Img 2 Thumbnail" image_number="2" onClick={(event) => {this.processNewLargeImage(event, this.largeImageRef, this.chosenThumbnailImageRef)}} />
                            <img src="./images/image-product-3-thumbnail.jpg" className="image_thumbnail" alt="Product Img 3 Thumbnail" image_number="3" onClick={(event) => {this.processNewLargeImage(event, this.largeImageRef, this.chosenThumbnailImageRef)}} />
                            <img src="./images/image-product-4-thumbnail.jpg" className="image_thumbnail" alt="Product Img 4 Thumbnail" image_number="4" onClick={(event) => {this.processNewLargeImage(event, this.largeImageRef, this.chosenThumbnailImageRef)}} />
                        </section>
                    </section>
                        <ProductDetails 
                        prodDetails={this.props.prodDetails}
                        addToCart={this.props.addToCart}
                        removeFromCart={this.props.removeFromCart}
                        nextBasketItemRemovalIndex={this.props.nextBasketItemRemovalIndex}
                    />
                </article>
                { (this.state.displayModal === true) ? <Modal processNewLargeImage={this.processNewLargeImage} toggleModalDisplay={this.toggleModalDisplay} />: ""}
            </section>
        )
    }
}

class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.modalLargeImageRef = React.createRef()
        this.modalThumbnailImageRef = React.createRef()
    }

    render() {
        return (
            <section className="modal desktop">
                <section className="image_selection_container desktop">
                    <section className="large_product_image_container">
                        <img src="./images/icon-close.svg" className="close_modal" onClick={this.props.toggleModalDisplay} />
                        <span className="image_selector back no_select" onClick={(event) => {this.props.processNewLargeImage(event, this.modalLargeImageRef, this.modalThumbnailImageRef, -1)}}>{"<"}</span>
                        <img src="./images/image-product-1.jpg" className="large_product_image large_product_image_modal" alt="Product Img 1" image_number="1" ref={this.modalLargeImageRef} />
                        <span className="image_selector forward no_select" onClick={(event) => {this.props.processNewLargeImage(event, this.modalLargeImageRef, this.modalThumbnailImageRef, 1)}}>{">"}</span>
                    </section>
                    <section className="image_thumbnails_list_container desktop">
                        <img src="./images/image-product-1-thumbnail.jpg" className="image_thumbnail image_thumbnail_modal" alt="Product Img 1 Thumbnail" image_number="1" onClick={(event) => {this.props.processNewLargeImage(event, this.modalLargeImageRef, this.modalThumbnailImageRef)}} ref={this.modalThumbnailImageRef} />
                        <img src="./images/image-product-2-thumbnail.jpg" className="image_thumbnail image_thumbnail_modal" alt="Product Img 2 Thumbnail" image_number="2" onClick={(event) => {this.props.processNewLargeImage(event, this.modalLargeImageRef, this.modalThumbnailImageRef)}} />
                        <img src="./images/image-product-3-thumbnail.jpg" className="image_thumbnail image_thumbnail_modal" alt="Product Img 3 Thumbnail" image_number="3" onClick={(event) => {this.props.processNewLargeImage(event, this.modalLargeImageRef, this.modalThumbnailImageRef)}} />
                        <img src="./images/image-product-4-thumbnail.jpg" className="image_thumbnail image_thumbnail_modal" alt="Product Img 4 Thumbnail" image_number="4" onClick={(event) => {this.props.processNewLargeImage(event, this.modalLargeImageRef, this.modalThumbnailImageRef)}} />
                    </section>
                </section>
            </section>
        )
    }
}

class ProductDetails extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            counter: 1,
        }

        this.modifyCounter = this.modifyCounter.bind(this)
        this.processAddToCart = this.processAddToCart.bind(this)
    }

    modifyCounter(changeBy, currentValue) {
        let newQuantity = currentValue + changeBy
        if (newQuantity < 1) {
            newQuantity = 1
        }
        this.setState((state) => {
            return {
                counter: newQuantity,
            }
        })

        return
    }

    processAddToCart(event) {
        event.preventDefault()
        this.props.addToCart(<BasketItem basketProd={this.props.prodDetails} quantity={this.state.counter} removeFromCart={this.props.removeFromCart} nextBasketItemRemovalIndex={this.props.nextBasketItemRemovalIndex} />)
    }

    render() {
        return (
            <section className="product_details_container">
                <h4 className="company">{this.props.prodDetails["company"]}</h4>
                <h2 className="shoe_name">{this.props.prodDetails["shoeName"]}</h2>
                <span className="shoe_description">
                    {this.props.prodDetails["shoeDescription"]}
                </span>
                <section className="prices_container">
                    <section className="new_price_section">
                        <span className="new_price">
                            <strong>${this.props.prodDetails["discountedPrice"]}</strong>
                        </span>
                        <span className="discount_percentage">
                            <strong>{this.props.prodDetails["discountPercentage"]}</strong>
                        </span>
                    </section>
                    <span className="original_price">
                        ${this.props.prodDetails["originalPrice"]}
                    </span>
                </section>
                <form className="add_product_form">
                    <section className="counter">
                        <span className="remove_one quantity_modifier no_select" onClick={(event) => {this.modifyCounter(-1, this.state.counter.valueOf())}}>-</span>
                        <span className="quantity">{this.state.counter}</span>
                        <span className="add_one quantity_modifier no_select" onClick={(event) => {this.modifyCounter(1, this.state.counter.valueOf())}}>+</span>
                    </section>
                    <button className="orange_button add_to_cart_button" onClick={(event) => {this.processAddToCart(event)}}>
                        <img src="./images/icon-cart-white.svg" />
                        <span className="add_to_cart_text">Add to cart</span>
                    </button>
                </form>
            </section>
        )
    }
}

function BasketItem(props) {
    let total_product_price = props.basketProd['discountedPrice'] * props.quantity
    return (
        <section className="cart_product">
            <img src="./images/image-product-1-thumbnail.jpg" className="cart_product_img" alt="Shoe Thumbnail" />
            <span className="cart_product_title">{props.basketProd["shoeName"]}</span>
            <span className="cart_product_quantity">
                ${props.basketProd['discountedPrice']} x {props.quantity} <strong>${total_product_price}</strong>
            </span>
            <span className="cart_product_subtotal">
            </span>
            <img src="./images/icon-delete.svg" className="cart_product_remove_icon" alt="Remove Product" onClick={(event) => {props.removeFromCart(props.nextBasketItemRemovalIndex)}} />
        </section>
    )
}