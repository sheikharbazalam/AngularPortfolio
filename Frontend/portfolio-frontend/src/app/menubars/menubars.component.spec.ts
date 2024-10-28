import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubarsComponent } from './menubars.component';

describe('MenubarsComponent', () => {
  let component: MenubarsComponent;
  let fixture: ComponentFixture<MenubarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenubarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenubarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
