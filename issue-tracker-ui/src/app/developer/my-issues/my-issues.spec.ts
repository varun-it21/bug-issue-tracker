import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIssuesComponent } from './my-issues';

describe('MyIssues', () => {
  let component: MyIssuesComponent;
  let fixture: ComponentFixture<MyIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyIssuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyIssuesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
