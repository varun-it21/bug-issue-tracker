import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIssues } from './add-issues';

describe('AddIssues', () => {
  let component: AddIssues;
  let fixture: ComponentFixture<AddIssues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIssues]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIssues);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
