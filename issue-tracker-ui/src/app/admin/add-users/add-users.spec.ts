import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsers } from './add-users';

describe('AddUsers', () => {
  let component: AddUsers;
  let fixture: ComponentFixture<AddUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUsers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUsers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
