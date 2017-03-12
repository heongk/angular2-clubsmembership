import { ImplementationPage } from './app.po';

describe('implementation App', () => {
  let page: ImplementationPage;

  beforeEach(() => {
    page = new ImplementationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
