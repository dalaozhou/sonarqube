/*
 * SonarQube
 * Copyright (C) 2009-2018 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import * as React from 'react';
import { shallow } from 'enzyme';
import { ComponentNavHeader } from '../ComponentNavHeader';
import { Visibility } from '../../../../types';
import { isSonarCloud } from '../../../../../helpers/system';

jest.mock('../../../../../helpers/system', () => ({
  isSonarCloud: jest.fn().mockReturnValue(false)
}));

const component = {
  breadcrumbs: [{ key: 'my-project', name: 'My Project', qualifier: 'TRK' }],
  key: 'my-project',
  name: 'My Project',
  organization: 'foo',
  qualifier: 'TRK',
  visibility: Visibility.Public
};

const organization = {
  key: 'foo',
  name: 'The Foo Organization',
  projectVisibility: Visibility.Public
};

it('should not render breadcrumbs with one element', () => {
  expect(
    shallow(
      <ComponentNavHeader
        branchLikes={[]}
        component={component}
        currentBranchLike={undefined}
        shouldOrganizationBeDisplayed={false}
      />
    )
  ).toMatchSnapshot();
});

it('should render organization', () => {
  expect(
    shallow(
      <ComponentNavHeader
        branchLikes={[]}
        component={component}
        currentBranchLike={undefined}
        organization={organization}
        shouldOrganizationBeDisplayed={true}
      />
    )
  ).toMatchSnapshot();
});

it('should render alm links', () => {
  (isSonarCloud as jest.Mock<any>).mockReturnValueOnce(true);
  expect(
    shallow(
      <ComponentNavHeader
        branchLikes={[]}
        component={{
          ...component,
          almId: 'bitbucketcloud',
          almRepoUrl: 'https://bitbucket.org/foo'
        }}
        currentBranchLike={undefined}
        organization={organization}
        shouldOrganizationBeDisplayed={true}
      />
    )
  ).toMatchSnapshot();
});
