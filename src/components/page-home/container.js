import { connect } from 'react-redux';
import { PageHomeComponent } from './component';
import {
  fetchLatestSymbols,
  resetData,
} from './action';


export const mapStateToProps = state => state.pageHome;

export const mapDispatchToProps = dispatch => ({
  updateLatestSymbols: (
    base,
    initDefault,
    symbols,
  ) => dispatch(fetchLatestSymbols(
    base,
    initDefault,
    symbols,
  )),
  resetData: () => dispatch(resetData()),
});

export const PageHomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageHomeComponent);

export default PageHomeContainer;
