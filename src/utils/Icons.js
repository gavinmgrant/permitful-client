import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle as farFaCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faTrash as fasFaTrash } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope as fasFaEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub as fabFaGithub } from '@fortawesome/free-brands-svg-icons';

export const HeartSolid = <FontAwesomeIcon icon={fasFaHeart} />;
export const HeartOutline = <FontAwesomeIcon icon={farFaHeart} />;
export const CheckCircle = <FontAwesomeIcon icon={farFaCheckCircle} />;
export const Trash = <FontAwesomeIcon icon={fasFaTrash} />;
export const Email = <FontAwesomeIcon icon={fasFaEnvelope} />;
export const Github = <FontAwesomeIcon icon={fabFaGithub} />;