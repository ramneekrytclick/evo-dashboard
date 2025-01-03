import { DesignerTitle, ImagePath } from '@/Constant';
import { carouselDataList } from '@/Data/BonusUi/Timeline';
import { useState } from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Badge, Carousel, CarouselControl, CarouselIndicators, CarouselItem } from 'reactstrap';

const CarouselTimeline = () => {
  const CarouselSpanText: string = "Spend some time looking up current design trend.";

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === carouselDataList.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };


  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? carouselDataList.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex: number) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = carouselDataList.map((item, index) => {
    return (
      <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={index}>
        <picture><img src={`${ImagePath}/banner/${item.image}`} alt='office-work' className='d-block w-100' /></picture>
      </CarouselItem>
    );
  });

  return (
    <VerticalTimelineElement className='vertical-timeline-element--work' date='April 23 2022' icon={<i className="icon-image"></i>} iconClassName='cd-timeline-img bg-success'>
      <div className='timeline-wrapper'>
        <Badge color='info'>{DesignerTitle}</Badge>
      </div>
      <h4 className='m-0 vertical-timeline-element-subtitle'>{'Research about most recent design trends.'}</h4>
      <p className='mb-0'>{CarouselSpanText}</p>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators items={carouselDataList} activeIndex={activeIndex} onClickHandler={goToIndex} />{slides}<CarouselControl direction='prev' directionText='Previous' onClickHandler={previous} />
        <CarouselControl direction='next' directionText='Next' onClickHandler={next} />
      </Carousel>
    </VerticalTimelineElement>
  );
};
export default CarouselTimeline;