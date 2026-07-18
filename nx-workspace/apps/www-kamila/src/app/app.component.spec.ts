import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it(`should have as title 'www-kamila'`, () => {
    const app = new AppComponent();

    expect(app.title).toEqual('www-kamila');
  });
});
