import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatfeatureComponent } from './chatfeature.component';

describe('ChatfeatureComponent', () => {
  let component: ChatfeatureComponent;
  let fixture: ComponentFixture<ChatfeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatfeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatfeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
