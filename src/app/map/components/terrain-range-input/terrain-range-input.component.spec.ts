import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainRangeInputComponent } from './terrain-range-input.component';

describe('TerrainRangeInputComponent', () => {
  let component: TerrainRangeInputComponent;
  let fixture: ComponentFixture<TerrainRangeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerrainRangeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerrainRangeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
