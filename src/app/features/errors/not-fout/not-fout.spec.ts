import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFout } from './not-fout';

describe('NotFout', () => {
  let component: NotFout;
  let fixture: ComponentFixture<NotFout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
