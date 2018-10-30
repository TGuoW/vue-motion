let reusedTuple = [0, 0]

export default function stepper(
  secondPerFrame,
  x,
  v,
  destX,
  k,
  b,
  precision,
) {
  const Fspring = -k * (x - destX)
  const Fdamper = -b * v
  const a = Fspring + Fdamper
  const newV = v + a * secondPerFrame
  const newX = x + newV * secondPerFrame

  if (Math.abs(newV) < precision && Math.abs(newX - destX) < precision) {
    reusedTuple[0] = destX
    reusedTuple[1] = 0
    return reusedTuple
  }

  reusedTuple[0] = newX
  reusedTuple[1] = newV
  return reusedTuple
}
