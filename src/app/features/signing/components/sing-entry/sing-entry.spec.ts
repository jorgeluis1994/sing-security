import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingEntry } from './sing-entry';

describe('SingEntry', () => {
  let component: SingEntry;
  let fixture: ComponentFixture<SingEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingEntry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingEntry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
