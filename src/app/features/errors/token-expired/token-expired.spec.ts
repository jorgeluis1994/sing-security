import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenExpired } from './token-expired';

describe('TokenExpired', () => {
  let component: TokenExpired;
  let fixture: ComponentFixture<TokenExpired>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenExpired]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenExpired);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
