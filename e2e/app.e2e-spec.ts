import { SwedFrontPage } from './app.po';

describe('swed-front App', function() {
  let page: SwedFrontPage;

  beforeEach(() => {
    page = new SwedFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
