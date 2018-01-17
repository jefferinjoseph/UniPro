import { Unipro2Page } from './app.po';

describe('unipro2 App', function() {
  let page: Unipro2Page;

  beforeEach(() => {
    page = new Unipro2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
