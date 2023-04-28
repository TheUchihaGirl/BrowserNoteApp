import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifynoteComponent } from './modifynote.component';

describe('ModifynoteComponent', () => {
  let component: ModifynoteComponent;
  let fixture: ComponentFixture<ModifynoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifynoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifynoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
