import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle as farFaCheckCircle } from '@fortawesome/free-regular-svg-icons';

export const HeartSolid = <FontAwesomeIcon icon={fasFaHeart} />;
export const HeartOutline = <FontAwesomeIcon icon={farFaHeart} />;
export const CheckCircle = <FontAwesomeIcon icon={farFaCheckCircle} />;