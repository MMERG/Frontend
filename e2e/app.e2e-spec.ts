import { MergeProjektFrontPage } from './app.po';

describe('merge-projekt-front App', function() {
  let page: MergeProjektFrontPage;

  beforeEach(() => {
    page = new MergeProjektFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
