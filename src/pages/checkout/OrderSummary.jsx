import { formatMoney } from "../../utils/money"
import dayjs from "dayjs"
import axios from "axios"

export function OrderSummary({ deliverOptions, cart, loadCart }) {

    return (
        <div className="order-summary">
            {deliverOptions.length > 0 && cart.map((cartItem) => {
                const selectedDeliveryOptions = deliverOptions.find(
                    (dO) => {

                        return dO.id === cartItem.deliveryOptionId
                    }
                )
                const deleteCartItem = async () => {
                    await axios.delete(`/api/cart-items/${cartItem.productId}`)
                    await loadCart()
                }

                return (
                    <div key={cartItem.productId} className="cart-item-container">
                        <div className="delivery-date">
                            Delivery date: {dayjs(selectedDeliveryOptions.estimatedDeliveryTimeMs).format(`dddd , MMMM d`)}

                        </div>

                        <div className="cart-item-details-grid">
                            <img className="product-image"
                                src={cartItem.product.image} />

                            <div className="cart-item-details">
                                <div className="product-name">
                                    {cartItem.product.name}
                                </div>
                                <div className="product-price">
                                    {formatMoney(cartItem.priceCents)}
                                </div>
                                <div className="product-quantity">
                                    <span>
                                        Quantity: <span className="quantity-label">2</span>
                                    </span>
                                    <span className="update-quantity-link link-primary">
                                        Update
                                    </span>
                                    <span className="delete-quantity-link link-primary"
                                        onClick={deleteCartItem}>
                                        Delete
                                    </span>
                                </div>
                            </div>

                            <div className="delivery-options">
                                <div className="delivery-options-title">
                                    Choose a delivery option:
                                </div>
                                {deliverOptions.map((dI) => {
                                    let PriceString = `Free Shipping`
                                    if (dI.priceCents > 0) {
                                        PriceString = `${formatMoney(dI.priceCents)} - Shipping`
                                    }
                                    const updateDeliverOption = async () => {
                                        await axios.put(`/api/cart-items/${cartItem.productId}`, {
                                            deliveryOptionId: dI.id
                                        })
                                        console.log("cartitem.id", cartItem.id, 'dI.id', dI.id);

                                        await loadCart()
                                    }
                                    return (
                                        <div key={dI.id} className="delivery-option"
                                            onClick={updateDeliverOption}>
                                            <input type="radio"
                                                checked={dI.id === cartItem.deliveryOptionId}
                                                onChange={() => { }}
                                                className="delivery-option-input"
                                                name={`delivery-option-${cartItem.productId}`} />
                                            <div>
                                                <div className="delivery-option-date">
                                                    {dayjs(dI.estimatedDeliveryTimeMs).format('dddd, MM D')}
                                                </div>
                                                <div className="delivery-option-price">
                                                    {PriceString}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}