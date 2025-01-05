import { render, screen } from '@testing-library/react';
import { InertiaApp } from '@inertiajs/react';
import { Dashboard } from '../Pages/Dashboard'; // Assuming Dashboard is a default export
import '@testing-library/jest-dom';
import React from 'react';

describe('Dashboard', () => {
  test('checks if search input with name="search" is present', () => {
    render(
      <InertiaApp
        initialPage={{ component: 'Dashboard' }}
        resolveComponent={(name) => {
          console.log('Component name:', name);
          return name === 'Dashboard' ? Dashboard : null;
        }}
      />
    );

    // Verifying if the search input is in the document
    const searchInput = screen.getByRole('textbox', { name: /search/i });
    expect(searchInput).toBeInTheDocument();
  });
});