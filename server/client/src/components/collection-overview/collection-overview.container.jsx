import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

import CollectionsOverview from './collection-overview.component';
import WithSpinner from '../with-spinner/wth-spinner.component';


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});


const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionOverviewContainer;