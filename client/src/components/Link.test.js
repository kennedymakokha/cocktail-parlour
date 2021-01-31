import React from 'react';
import Link from './Index.react'
import renderer from 'react-test-renderer';
 
it('renders correctly', () => {
 const tree = renderer
   .create(<Link page="kennesy" />)
   .toJSON();
   console.log(tree)
   expect(tree).toMatchSnapshot();
});