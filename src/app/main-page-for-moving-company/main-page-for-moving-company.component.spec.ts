import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageForMovingCompanyComponent } from './main-page-for-moving-company.component';

describe('MainPageForMovingCompanyComponent', () => {
  let component: MainPageForMovingCompanyComponent;
  let fixture: ComponentFixture<MainPageForMovingCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageForMovingCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageForMovingCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
