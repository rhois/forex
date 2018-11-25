/* global expect */

import {
    PageHomeContainer,
    mapStateToProps,
    mapDispatchToProps,
} from '../container';
  
describe('./page-home/container', () => {
    it('has state.pageHome.data in mapStateToProps', () => {
      const state = {
        pageHome: {
          data: ['array of data'],
        },
      };
  
      const returnValue = mapStateToProps(state);
  
      expect(returnValue).toEqual(state.pageHome);
    });
    it('wrapped PageHomeComponent component', () => {
      expect(PageHomeContainer.WrappedComponent.name).toEqual('PageHomeComponent');
    });
    it('has necessary functions in mapDispatchToProps', () => {
      const returnValue = mapDispatchToProps(() => {});
  
      expect(Object.keys(returnValue).length).toEqual(2);
      expect(typeof returnValue.updateLatestSymbols).toEqual('function');
      expect(typeof returnValue.resetData).toEqual('function');
    });
});
  