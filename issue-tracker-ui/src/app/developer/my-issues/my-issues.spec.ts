import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIssues } from './my-issues';

describe('MyIssues', () => {
  let component: MyIssues;
  let fixture: ComponentFixture<MyIssues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyIssues]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyIssues);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
