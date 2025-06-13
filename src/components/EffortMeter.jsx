import { FiStar } from 'react-icons/fi'

export default function EffortMeter({ level, maxLevel = 5 }) {
  return (
    <div className="effort-meter">
      {[...Array(maxLevel)].map((_, i) => (
        <span key={i} className={`effort-star ${i < level ? '' : 'empty'}`}>
          <FiStar className={i < level ? 'fill-current' : ''} />
        </span>
      ))}
    </div>
  )
}
