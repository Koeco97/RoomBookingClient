export class Room {
  id!: number;
  name!: string;
  location!: string;
  capacities = new Array<LayoutCapacity>();
}

export class LayoutCapacity {
  layout!: Layout;
  capacity!: number;
}

// These are the different ways that we could layout a room for a meeting.
export enum Layout {
  THEATER = 'Theater', // Theatre style would mean rows of chairs
  USHAPE = 'U-Shape', // U-shape would mean the chairs are in, like, a semi-circle
  BOARD = 'Board Meeting' // board meeting would mean all the chairs are around a table in the centre of the room
}
