/* eslint-disable prettier/prettier */
enum DeliveryStatus {
  // Canceled = -1,
  // Pending,
  // AssignedToCourier,
  // InTransit,
  // Delivered
  Canceled = 'CANCELED',
  Pending = 'PENDING',
  Assigned_To_Courier = 'ASSIGNED TO COURIER',
  InTransit = 'IN TRANSIT',
  Delivered = 'DELIVERED',
}

enum PickupType {
  // closestPark = 1,
  // doorStep = 2,
  DoorStep = 'DOORSTEP',
  Pick_Location = 'NEUTRAL GROUND',
}
