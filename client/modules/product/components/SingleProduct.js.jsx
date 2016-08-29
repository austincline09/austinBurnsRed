import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import actions
import { singleActions } from '../actions';

class SingleProduct extends Base {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    // console.log("Single item mounting");
    const { dispatch, params } = this.props;
    dispatch(singleActions.fetchSingleProductById(params.productId, true ))
  }

  render() {
    const { item } = this.props;
    const isEmpty = !item;
    console.log("isEmpty", isEmpty);
    return  (
      <div className="flex">
        <section className="section">
          <div className="yt-container">
            <h3> Single Product Item </h3>
            {isEmpty
              ? (item.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                : <div style={{ opacity: item.isFetching ? 0.5 : 1 }}>

                  <h1> { item.title }
                    <Link className="yt-btn small u-pullRight" to={`/products/${item._id}/update`}> UPDATE PRODUCT </Link>
                  </h1>
                  <hr/>
                  <p> {item.description }</p>
                </div>
            }
          </div>
        </section>
      </div>
    )
  }
}

SingleProduct.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return {
    item: store.product.single.item
  }
}

export default connect(
  mapStoreToProps
)(SingleProduct);
